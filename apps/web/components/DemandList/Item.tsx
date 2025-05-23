'use client';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';
import { TbUserCircle } from 'react-icons/tb';
import { Button } from '../ui/button';
import { useUser } from '@/context/UserContext';
import { Demand, DemandStatusEnum } from '@/types/Demand';

function Item(demand: Demand) {
  const { user } = useUser();

  return (
    <li className="px-4 py-5 bg-white border rounded-2xl">
      <h2 className="text-3xl font-semibold">{demand.name}</h2>

      <p className="text-blue-light text-sm mb-4">
        Publicado{' '}
        {formatDistanceToNow(demand.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </p>

      <p className="mb-8">{demand.description}</p>

      {demand.keywords.length > 0 && (
        <ul className="mb-8 flex gap-2">
          {demand.keywords.map((keyword) => (
            <li
              key={keyword.id}
              className="px-3 py-2 text-center bg-border rounded-full text-xs"
            >
              {keyword.name}
            </li>
          ))}
        </ul>
      )}

      <div className="grid grid-cols-[auto_1fr] grid-rows-3 gap-x-1.5">
        <TbUserCircle className="text-primary font-normal size-16 row-span-2 col-start-1" />
        <p className="self-end font-semibold text-lg leading-none self-center">
          {demand.company.user.name}
        </p>
        <div className="flex flex-col col-start-2 gap-2">
          <span className="leading-none text-blue-light text-sm">
            {demand.company.contactEmail}
          </span>
          <span className="leading-none text-blue-light text-sm ">
            {demand.company.contactPhone}
          </span>
        </div>
      </div>

      {user &&
        user.utype !== 'COMPANY' &&
        demand.status == DemandStatusEnum.CREATED && (
          <Button
            asChild
            variant={'outline'}
            className="px-9 py-2.5 rounded-full xs:mt-0"
          >
            <Link href={`/enviar-proposta/empresa/${demand.id}`}>
              Entrar em contato
            </Link>
          </Button>
        )}
    </li>
  );
}

export { Item };
