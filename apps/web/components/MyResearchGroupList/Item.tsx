import Link from 'next/link';
import { TbUserCircle } from 'react-icons/tb';
import { Button } from '../ui/button';
import { ResearchGroup } from '@/types/ResearchGroup';

const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

interface ItemProp {
  idPesquisador: string;
  researchGroup: Partial<ResearchGroup>;
}

function Item({ idPesquisador, researchGroup }: ItemProp) {
  const hasImage =
    !!researchGroup.img && researchGroup.img?.includes('/uploads/');
  const imageComponent = (
    <img
      src={`${apiURL}${researchGroup.img}`}
      alt="Logo do Grupo de Pesquisa"
      className="row-span-2 col-start-1 row-start-1 size-16"
    />
  );

  return (
    <li className="px-4 py-5 bg-white border rounded-2xl">
      <div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-x-1.5">
        {hasImage ? (
          imageComponent
        ) : (
          <TbUserCircle className="text-primary font-normal size-16 row-span-2 col-start-1" />
        )}
        <h2 className="font-semibold text-lg leading-none gap-3">
          {researchGroup.name}
        </h2>
        <p className="px-3 py-2 self-center vertical-center justify-self-start bg-border rounded-full text-xs">
          {idPesquisador === researchGroup?.leader?.userId ? 'Líder' : 'Membro'}
        </p>
      </div>

      <ul className="my-4 flex gap-2">
        {researchGroup?.knowledgeAreas?.map((area) => (
          <li
            key={area.id}
            className="px-3 py-2 text-center bg-border rounded-full text-xs"
          >
            {area.name}
          </li>
        ))}
      </ul>

      <Link href={`/detalhe-grupo-pesquisa/${researchGroup.id}`}>
        <Button variant={'outline'} className="px-9 py-2.5 rounded-full mt-3">
          ver mais
        </Button>
      </Link>
    </li>
  );
}

export { Item };
