import {
  MyResearchGroup,
  PesquisadorGrupo,
} from '@/modules/meus-grupos-pesquisa/interfaces/pesquisador-grupo';
import { Item } from './Item';
import { ResearchGroup } from '@/types/ResearchGroup';

interface MyResearchGroupListProps {
  pesquisador: PesquisadorGrupo;
}

function MyResearchGroupList({ pesquisador }: MyResearchGroupListProps) {
  const data: MyResearchGroup[] = pesquisador.groupsAsMember;

  return (
    <ul className="grid grid-cols-2 gap-3">
      {data.length > 0 ? (
        data.map((group) => (
          <li key={group.id}>
            <Item
              idPesquisador={pesquisador.id}
              researchGroup={group as Partial<ResearchGroup>}
            />
          </li>
        ))
      ) : (
        <div>Nenhum grupo de pesquisa encontrado</div>
      )}
    </ul>
  );
}

export { MyResearchGroupList };
