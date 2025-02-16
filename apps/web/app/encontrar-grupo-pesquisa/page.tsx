"use client";

import { ResearchGroupList } from "@/components/ResearchGroupList";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiSearch } from "react-icons/fi";
import useGetAllResearchGroups from "@/api/research-group/use-get-all-research-group";
import { useEffect, useState } from "react";
import useGetAllKnowledgeAreas from "@/api/research-group/use-get-all-knowledgeAreas";
import { ResearchGroup } from "@/types/ResearchGroup";

function EncontrarGrupoPesquisa() {
  const { data } = useGetAllResearchGroups();
  const { data: knowledgeAreas } = useGetAllKnowledgeAreas();
  const [researchgroups, setResearchgroups] = useState(data || []);
  const [search, setSearch] = useState("");
  const [areas, setAreas] = useState<{ id: string; name: string }[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setResearchgroups(data);
    }
  }, [data]);

  useEffect(() => {
    handleFilters();
  }, [selectedAreas, search]);

  function handleSearch() {
    const searchValue = document.querySelector("input")?.value;
    setSearch(searchValue || "");
  }

  function filterByArea(currentValues: ResearchGroup[]) {
    const filtered = currentValues.filter((group) =>
      selectedAreas.some((area) => group.knowledgeAreas.filter((a) => a.name === area).length > 0)
    );
    
    return filtered
  }

  function filterByNameAndDescription(currentValues: ResearchGroup[]) {
    const filtered = currentValues.filter((group) =>
      group.name.toLowerCase().includes(search.toLowerCase()) ||
      group.description.toLowerCase().includes(search.toLowerCase())
    );
      
    return filtered
  }

  function handleFilters() {
    if(!data) return

    let filteredResearchGroups = data;
    if (selectedAreas.length > 0) {
      filteredResearchGroups = filterByArea(filteredResearchGroups);
    }

    if (search) {
      filteredResearchGroups = filterByNameAndDescription(filteredResearchGroups);
    }

    setResearchgroups(filteredResearchGroups);
  }

  useEffect(() => {
    setAreas(knowledgeAreas || []);
  }, [knowledgeAreas]);

  function handleCheckboxChange(name: string, isChecked: boolean) {
    const newSelectedAreas = isChecked
      ? [...selectedAreas, name]
      : selectedAreas.filter((area) => area !== name);
    setSelectedAreas(newSelectedAreas);
  }

  return (
    <main className="max-w-screen-xl w-full px-8 mx-auto mb-auto grid md:grid-cols-[auto_1fr] md:grid-rows-[auto_auto_1fr] md:gap-3">
      <h1 className="font-semibold text-4xl mt-12 mb-8 md:col-span-2">
        Encontrar grupo de pesquisa
      </h1>

      <aside className="bg-white h-fit border py-8 px-6 rounded-2xl min-w-60 lg:min-w-80 hidden md:flex md:flex-col md:gap-5 row-span-2">
        <div>
          <Label className="font-semibold">Área</Label>
          <ul className="pr-4 flex gap-2 flex-col mt-2">
            {areas.map((area) => (
              <li key={area.id} className="flex items-center gap-1">
                <Checkbox
                  id={area.id}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(area.name, checked === true)
                  }
                />
                <Label htmlFor={area.id}>{area.name}</Label>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="flex gap-2 mb-4 md:mb-0">
        <Input
          className="bg-white h-12 rounded-lg"
          placeholder="Buscar grupo de pesquisa"
          onClear={() => setSearch("")}
          isSearching={search.length > 0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button className="h-12 rounded-lg" onClick={handleSearch}>
          <FiSearch />
          Pesquisar
        </Button>
      </div>

      <ResearchGroupList researchgroups={researchgroups} />
    </main>
  );
}

export default EncontrarGrupoPesquisa;
