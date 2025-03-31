'use client';

import useGetMyProposals from '@/api/proposals/use-get-my-proposals';
import MinhasPropostasFilter from './components/filter/minhasPropostasFilter';
import MinhasPropostasTable from './components/table/minhasPropostasTable';

const MyProposalsPage = () => {
  const { data: proposals } = useGetMyProposals();

  return (
    <main className="flex flex-col flex-grow h-full w-full p-3 items-center">
      <section className="max-w-7xl w-full flex flex-col gap-4">
        <h2 className="text-blue-strong font-bold text-3xl">
          Minhas Propostas
        </h2>
        <MinhasPropostasFilter />
        {proposals && <MinhasPropostasTable data={proposals} />}
      </section>
    </main>
  );
};

export default MyProposalsPage;
