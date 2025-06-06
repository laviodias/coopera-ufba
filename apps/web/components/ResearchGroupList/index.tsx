import { ResearchGroup } from '@/types/ResearchGroup';
import { Item } from './Item';

type ResearchGroupListProps = {
  researchgroups: ResearchGroup[];
};

function ResearchGroupList({ researchgroups }: ResearchGroupListProps) {
  return (
    <ul className="grid md:grid-cols-2 gap-3 mb-4">
      {researchgroups.length ? (
        researchgroups.map((researchgroup) => (
          <Item key={researchgroup.id} {...researchgroup} />
        ))
      ) : (
        <div className="px-4 py-5 h-fit bg-white border rounded-xl col-span-2">
          Nenhum grupo de pesquisa encontrado
        </div>
      )}
    </ul>
  );
}

export { ResearchGroupList };
