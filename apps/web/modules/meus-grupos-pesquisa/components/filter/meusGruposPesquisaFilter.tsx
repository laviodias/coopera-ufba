import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CustomIcon } from '@/modules/components/icon/customIcon';

import { IoSearch } from 'react-icons/io5';

interface MeusGruposPesquisaFilterProps {
  handleSearch: () => void;
  setOrder: (value: 'asc' | 'desc') => void;
  order: 'asc' | 'desc';
  isSearching: boolean;
}

const MeusGruposPesquisaFilter = ({
  handleSearch,
  isSearching,
}: MeusGruposPesquisaFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex gap-2 w-full">
        <Input
          className="bg-white px-4 h-12"
          placeholder="Buscar"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          onClear={() => handleSearch()}
          isSearching={isSearching}
        />
        <Button className="size-12" onClick={handleSearch}>
          <CustomIcon icon={IoSearch} className="!size-6" />
        </Button>
      </div>
    </div>
  );
};

export default MeusGruposPesquisaFilter;
