import { useEffect, useState } from 'react';
import Head from 'next/head';

import { api } from '../../services/axios';

import { NewOrderModal } from '../../components/NewOrderModal';

import styles from './styles.module.scss';

import Link from 'next/link';

import { MdEditNote } from 'react-icons/md';
import { AiFillPlusCircle } from 'react-icons/ai';

type ServiceOrderProps = {
  id: string;
  client: string;
  vehicle: string;
  plate: string;
  year: string;
  status: string;
  mechanic: string;
  description: string;
  createdAt: Date;
}

export default function Orders() {
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [haveNewOrders, setHaveNewOrders] = useState(false);

  const [orders, setOrders] = useState<ServiceOrderProps[]>([]);

  function handleOpenNewOrderModal() {
    setIsNewOrderModalOpen(true);
  }

  function handleCloseNewOrderModal() {
    setIsNewOrderModalOpen(false);

    setHaveNewOrders(true);
  }

  useEffect(() => {
    const getOrders = async () => {
      const response = await api.get('/manage-service-order');

      const updatedOrders: ServiceOrderProps[] = response.data.data.map(order => ({
        id: order.data.id,
        client: order.data.client,
        vehicle: order.data.vehicle,
        plate: order.data.plate,
        year: order.data.year,
        status: order.data.status,
        description: order.data.description,
        createdAt: order.data.createdAt
      }));

      setOrders(updatedOrders);
    }

    getOrders();

    setHaveNewOrders(false);
  }, [haveNewOrders]);

  return (
    <>
      <Head>
        <title>Ordens de serviço | i.Fix</title>
      </Head>

      <main className={styles.osContainer}>
        <div className={styles.osHeader}>
          <h1>Ordens de Serviço</h1>
            <button onClick={handleOpenNewOrderModal}>
              <span>Criar</span>
              <AiFillPlusCircle />
            </button>
        </div>

        <table className={styles.osTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Veículo</th>
              <th>Placa</th>
              <th>Status</th>
              <th>Data</th>
              <th>Editar</th>
            </tr>
          </thead>

          <tbody>
            {
              orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.client}</td>
                  <td>{order.vehicle}</td>
                  <td>{order.plate}</td>
                  <td>{order.status}</td>
                  <td>
                    {new Intl.DateTimeFormat('pt-BR').format(
                      new Date(order.createdAt)
                    )}
                  </td>
                  <td>
                    <Link href={`/orders/${order.id}`}>
                      <a>
                        <MdEditNote/>
                      </a>
                    </Link>
                  </td>
                </tr>
                ))
            }
          </tbody>
        </table>
      </main>

      <NewOrderModal
        isOpen={isNewOrderModalOpen}
        onRequestClose={handleCloseNewOrderModal}
      />
    </>
  );
}
