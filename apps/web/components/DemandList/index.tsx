import { Demand } from '@/types/Demand';
import { Item } from './Item';

type DemandListProps = {
  demands: Demand[];
};

function DemandList({ demands }: DemandListProps) {
  return (
    <ul className="flex flex-col gap-6">
      {demands.length ? (
        demands.map((demand) => <Item key={demand.id} {...demand} />)
      ) : (
        <div className="px-4 py-5 bg-white border rounded-xl">
          Nenhuma demanda encontrada no momento
        </div>
      )}
    </ul>
  );
}

export { DemandList };
