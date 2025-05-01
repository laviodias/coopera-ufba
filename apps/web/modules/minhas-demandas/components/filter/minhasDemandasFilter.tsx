'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CustomIcon } from '@/modules/components/icon/customIcon';
import { PiSortAscending, PiSortDescending } from 'react-icons/pi';
import { IoSearch } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { DemandStatusTranslationEnum } from '@/types/Demand';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  setFilter: (filter: string) => void;
  handleFilter: () => any;
  handleStatusFilter: (status: string) => void;
  handleSortFilter: (sort: string) => void;
}

const MinhasDemandasFilter = ({
  setFilter,
  handleFilter,
  handleStatusFilter,
  handleSortFilter,
}: Props) => {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sortFilter, setSortFilter] = useState<string>('asc');

  useEffect(() => {
    handleStatusFilter(statusFilter);
  }, [statusFilter]);

  useEffect(() => {
    handleSortFilter(sortFilter);
  }, [sortFilter]);

  return (
    <section className="flex flex-col sm:flex-row gap-2">
      <div className="flex gap-2 w-full">
        <Input
          onBlur={(e) => setFilter(e.target.value)}
          className="bg-white px-4 h-12"
          placeholder="Buscar"
        />
        <Button onClick={handleFilter} className="size-12">
          <CustomIcon icon={IoSearch} className="!size-6" />
        </Button>
      </div>
      <div className="flex gap-2">
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value)}
          required
        >
          <SelectTrigger className="bg-white h-auto">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(DemandStatusTranslationEnum).map(
              ([value, status]) => (
                <SelectItem key={value} value={value}>
                  {status}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
        <Button
          variant={'tertiary'}
          className="h-12"
          onClick={() => setSortFilter(sortFilter === 'asc' ? 'desc' : 'asc')}
        >
          {sortFilter === 'asc' ? 'Mais recentes' : 'Mais antigas'}
          <CustomIcon
            icon={sortFilter === 'asc' ? PiSortDescending : PiSortAscending}
            className="!size-5"
          />
        </Button>
      </div>
    </section>
  );
};

export default MinhasDemandasFilter;
