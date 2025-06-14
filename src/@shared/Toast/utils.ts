const createGenerateId = () => {
  let id = -1;

  return () => {
    return ++id;
  };
};

export const generateId = createGenerateId();
