import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { MultiSelect } from '@/components/ui/multi-select';
import { toast } from '@/hooks/use-toast';
import useAddKeyword from '../api/keywords/use-add-keyword';
import useGetKeywords from '../api/keywords/use-get-keywords';

function Keywords({
  onChange,
  defaultValue = [],
  optional = false,
}: {
  onChange: Dispatch<SetStateAction<string[]>>;
  defaultValue: string[];
  optional?: boolean;
}) {
  const { data: keywords = [], refetch } = useGetKeywords();
  const mappedKeywords = keywords.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  function handleKeyword(name: string) {
    keywordMutate(name);
  }

  const { mutate: keywordMutate } = useAddKeyword(
    () => {
      toast({
        variant: 'success',
        title: 'Sucesso',
        description: 'A palavra-chave foi cadastrada com sucesso.',
      });
      refetch();
    },
    () => {
      toast({
        variant: 'destructive',
        title: 'Ocorreu um error',
        description: 'Ocorreu um erro ao tentar criar nova palavra-chave.',
      });
    },
  );

  return (
    <div className="font-bold text-base text-blue-strong">
      <label>Palavras-chave{optional ? '' : '*'}</label>
      <div className="flex items-center mt-2">
        <MultiSelect
          options={mappedKeywords}
          onValueChange={onChange}
          defaultValue={defaultValue}
          placeholder="Selecione palavras-chave ou digite uma nova para criá-la"
          variant="inverted"
          empty={(search) => (
            <div className={'px-10'}>
              <Button onClick={() => handleKeyword(search)}>
                {' '}
                Criar {search}
              </Button>
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default Keywords;
