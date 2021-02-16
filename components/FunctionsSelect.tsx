import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import { Select } from "@chakra-ui/react";
import { functions } from "../config";

interface FunctionsSelectProps {}
const FunctionsSelect: FunctionComponent<FunctionsSelectProps> = (props) => {
  const router = useRouter();
  const { name } = router.query;
  const [myFunction, setMyFunction] = useState(name ? name : "");

  const onItemSelect = (event: {
    preventDefault: () => void;
    target: { value: any };
  }) => {
    event.preventDefault();
    const name = event.target.value;
    setMyFunction(name);
    if (name) {
      router.push(`/functions/${name}`);
    } else {
      router.push(`/`);
    }
  };

  return (
    <Select
      value={myFunction}
      onChange={onItemSelect}
      placeholder="Виберіть функцію із списку"
    >
      {functions.map((f) => (
        <option key={f.name} value={f.name}>
          {f.prettyName}
        </option>
      ))}
    </Select>
  );
};

export { FunctionsSelect };
