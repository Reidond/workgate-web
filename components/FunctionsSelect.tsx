import { FunctionComponent, SyntheticEvent, useState } from "react";
import { Button, MenuItem } from "@blueprintjs/core";
import { ItemRenderer, ItemPredicate, Select } from "@blueprintjs/select";
import { functions, MyFunctionDefault } from "../helpers/functionsConfig";
import { useRouter } from "next/router";

const FunctionSelectB = Select.ofType<MyFunctionDefault>();

interface FunctionsSelectProps {}

const FunctionsSelect: FunctionComponent<FunctionsSelectProps> = (props) => {
  const router = useRouter();
  const routerPathnameSplit = router.pathname.split("/");
  const myFunctionName = routerPathnameSplit[routerPathnameSplit.length - 1];
  const myFunctionFromPath = functions.find((v) => v.name === myFunctionName);
  const [myFunction, setMyFunction] = useState(
    myFunctionFromPath ? myFunctionFromPath : null
  );

  const renderFunction: ItemRenderer<MyFunctionDefault> = (
    myFunction,
    { handleClick, modifiers }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        key={myFunction.name}
        label={myFunction.endpoint()}
        onClick={handleClick}
        text={myFunction.prettyName}
      />
    );
  };

  const filterFunction: ItemPredicate<MyFunctionDefault> = (
    query,
    myFunction
  ) => {
    return (
      myFunction.prettyName.toLowerCase().indexOf(query.toLowerCase()) >= 0
    );
  };

  const onItemSelect = (
    item: MyFunctionDefault,
    event?: SyntheticEvent<HTMLElement, Event>
  ) => {
    event.preventDefault();
    setMyFunction(item);
    router.push(`/functions/${item.name}`);
  };

  return (
    <FunctionSelectB
      itemPredicate={filterFunction}
      itemRenderer={renderFunction}
      items={functions}
      onItemSelect={(
        item: MyFunctionDefault,
        event?: SyntheticEvent<HTMLElement, Event>
      ) => onItemSelect(item, event)}
    >
      <Button
        rightIcon="caret-down"
        text={myFunction ? `${myFunction.prettyName}` : "(No selection)"}
      />
    </FunctionSelectB>
  );
};

export { FunctionsSelect };
