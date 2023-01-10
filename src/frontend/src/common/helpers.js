import resources from "@/common/enums/resources";

import { AuthApiService, CrudApiService, ReadOnlyApiService } from "@/services/api.service";

export const countSum = items => {
  return items.reduce((prev, curr) => prev + (curr.price * curr.amount), 0);
};

export const getDoughText = (size, dough, doughSpellingMap) => {
  return `${size}, на ${doughSpellingMap[dough]} тесте`
};

export const getSauceText = sauce => {
  return `Соус: ${sauce.toLowerCase()}`;
};

export const getIngredientsText = ingredients => {
  return `Начинка: ${ Object.keys(ingredients).map(it => it.toLowerCase()).join(", ")}`;
};

export const createResources = () => {
  return {
    [resources.AUTH]: new AuthApiService(),
    [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH),
    [resources.SIZE]: new ReadOnlyApiService(resources.SIZE),
    [resources.SAUCE]: new ReadOnlyApiService(resources.SAUCE),
    [resources.INGREDIENTS]: new ReadOnlyApiService(resources.INGREDIENTS),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS),
  };
};
