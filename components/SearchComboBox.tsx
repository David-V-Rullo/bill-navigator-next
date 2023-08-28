"use client";
import { useState, Fragment } from "react";
import { Combobox } from "@headlessui/react";
import { FaCheck } from "react-icons/fa";

const chamber = [
  { id: 1, value: "House" },
  { id: 2, value: "Senate" },
];

function SearchComboBox() {
  const [selectedPerson, setSelectedPerson] = useState(chamber[0]);
  const [query, setQuery] = useState("");

  const filteredOption =
    query === ""
      ? chamber
      : chamber.filter((chamber) => {
          return chamber.value.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
      <Combobox.Options>
        {filteredOption.map((chamber) => (
          <Combobox.Option key={chamber.id} value={chamber} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={`${
                  active ? "bg-blue-500 text-white" : "bg-white text-black"
                }`}
              >
                {selected && <FaCheck />}
                {chamber.value}
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
export default SearchComboBox;
