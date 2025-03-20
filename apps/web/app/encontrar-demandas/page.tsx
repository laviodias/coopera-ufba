'use client';

import { DemandList } from '@/components/DemandList';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiSearch } from 'react-icons/fi';
import useGetAllDemands from '@/api/demandas/use-get-all-demands';
import { useState } from 'react';
import useGetFilterDemands from '@/api/demandas/use-get-filter-demands';
import { toast } from '@/hooks/use-toast';
import { Demand } from '@/types/Demand';
import { CustomIcon } from '@/modules/components/icon/customIcon';
import { HiOutlineAdjustmentsVertical } from 'react-icons/hi2';
import useGetKeywords from '@/api/keywords/use-get-keywords';
import useGetCompanies from '@/api/company/use-get-company-names';

function EncontrarDemandas() {
  const { data: demands = [] } = useGetAllDemands();
  const [filter, setFilter] = useState<string>('');
  const [filteredDemands, setFilteredDemands] = useState<Demand[]>();
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [publishedAtFilter, setPublishedAtFilter] = useState<string>('');
  const [companyFilter, setCompanyFilter] = useState<string>('');
  
  const { data: keywords } = useGetKeywords();
  const { data: companies } = useGetCompanies();

  const { mutate } = useGetFilterDemands(
    (data) => {
      setFilteredDemands(data);
      toast({ title: 'Demandas buscadas com sucesso!' });
    },
    () => toast({ title: 'Falha na Busca!' }),
  );

  const handleFilter = () => {
    mutate({query: filter, keywords: selectedKeywords.join(','), date: publishedAtFilter, company: companyFilter});
  };

  const handleKeywordSelection = (id: string) => {
    if (selectedKeywords.includes(id)) {
      setSelectedKeywords(selectedKeywords.filter((keyword) => keyword !== id));
    } else {
      setSelectedKeywords([...selectedKeywords, id]);
    }
  }

  const clearFilters = () => {
    setFilter('');
    setSelectedKeywords([]);
    setPublishedAtFilter('');
    setCompanyFilter('');
    setOpenFilters(false);
    setFilteredDemands(demands);
  }

  return (
    <main className="max-w-screen-xl w-full px-8 pb-8 mx-auto mb-auto grid md:grid-rows-[auto_auto_fr] gap-2 md:gap-3">
      <h1 className="font-semibold text-4xl mt-12 mb-8">Demandas</h1>

      <div className="flex gap-2">
        <Input
          className="bg-white h-12 rounded-lg"
          onBlur={(e) => setFilter(e.target.value)}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Buscar demanda"
        />
        <Button onClick={handleFilter} className="h-12 rounded-lg">
          <FiSearch />
        </Button>

        <Button variant={'tertiary'} className="size-12" onClick={() => setOpenFilters((prev) => !prev)}>
          <CustomIcon icon={HiOutlineAdjustmentsVertical} className="!size-6" />
        </Button>
      </div>

      {openFilters && (
        <aside className="bg-white h-fit border py-4 px-5 rounded-2xl min-w-60 lg:min-w-80 hidden md:flex md:flex-col md:gap-5 row-span-2">
          <div>
            <Label className="font-semibold">Palavras-chave</Label>

            <ul className="pr-4 grid grid-cols-3 gap-2 mt-2">
              {keywords?.map((keyword) => (
                <li key={keyword.id} className="flex items-center gap-1">
                  <Checkbox id={keyword.name} checked={selectedKeywords.includes(keyword.id)} onCheckedChange={() => handleKeywordSelection(keyword.id)}/>
                  <Label htmlFor={keyword.name}>{keyword.name}</Label>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Label htmlFor="publishedDate" className="font-semibold">
              Data de publicação
            </Label>
            <Select value={publishedAtFilter} onValueChange={setPublishedAtFilter}>
              <SelectTrigger id="publishedDate" className="bg-white h-auto mt-2">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TODAY">Hoje</SelectItem>
                <SelectItem value="THIS_WEEK">Esta semana</SelectItem>
                <SelectItem value="LAST_TWO_WEEKS">Últimas 2 semanas</SelectItem>
                <SelectItem value="THIS_MONTH">Este mês</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="company" className="font-semibold">
              Empresa
            </Label>
            <Select value={companyFilter} onValueChange={setCompanyFilter}>
              <SelectTrigger id="company" className="bg-white h-auto mt-2">
                <SelectValue placeholder="Selecione a empresa" />
              </SelectTrigger>
              <SelectContent>
                {companies?.map((company) => (
                  <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex gap-2 justify-end'>
            <Button variant={'outline'} onClick={clearFilters}>Limpar filtros</Button>
            <Button onClick={handleFilter}>Filtrar</Button>
          </div>
        </aside>
      )}

      <DemandList
        demands={filteredDemands ? filteredDemands : demands}
      />
    </main>
  );
}

export default EncontrarDemandas;
