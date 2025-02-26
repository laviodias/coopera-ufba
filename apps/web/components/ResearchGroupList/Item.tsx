import Link from 'next/link';
import { Button } from '../ui/button';
import { ResearchGroup } from '@/types/ResearchGroup';

function truncate(str: string, n: number, useWordBoundary: boolean) {
  if (str.length <= n) {
    return str;
  }
  const subString = str.slice(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(' '))
      : subString) + '...'
  );
}

function Item(researchgroup: ResearchGroup) {
  return (
    <li className="px-8 py-6 bg-white border rounded-2xl">
      <div className="flex xs:items-center justify-between mb-4 flex-col xs:flex-row">
        <h2 className="text-2xl font-semibold">{researchgroup.name}</h2>
      </div>

      <p className="mb-8 text-justify">
        {truncate(researchgroup.description, 200, true)}
      </p>

      <ul className="mb-8 flex gap-2">
        {researchgroup.knowledgeAreas.map((area) => (
          <li
            key={area.id}
            className="px-3 py-2 text-center bg-border rounded-full text-xs"
          >
            {area.name}
          </li>
        ))}
      </ul>

      <Link href={`/detalhe-grupo-pesquisa/${researchgroup.id}`}>
        <Button
          asChild
          variant={'outline'}
          className="px-9 py-2.5 rounded-full mt-3 xs:mt-0"
        >
          ver mais
        </Button>
      </Link>
    </li>
  );
}

export { Item };
