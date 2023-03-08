// class DecoratorFactory
export const Path = (path: string = "") => (constructor: Function) => {
  let pathVal = path;
  // path check
  if (path === "") {
    pathVal = constructor.name.toLowerCase().replace("controller", "");
  }
  Object.defineProperty(constructor, "meta:path", { value: path });
  // add path as matedata to target
};

// method DecoratorFactory
export const Action =
  (path: string = "", method: string = "get") =>
  (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    // target -> class
    // propertyKey -> function name as string
    // descriptor -> function define: { value: [Function: hey], writable: true, enumerable: false, configurable: true }
    // target[propertyKey] == descriptor.value
    let pathVal = path;
    // path check
    if (path === "") {
      pathVal = propertyKey.toLowerCase().replace("action", "");
    }
    // action path metadata
    Object.defineProperty(descriptor.value, "meta:path", { value: pathVal });
    // action method metadata
    Object.defineProperty(descriptor.value, "meta:method", { value: method });
  };

// property DecoratorFactory
const Prop = () => (target: Object, propertyKey: string | symbol) => {
};

// accessor DecoratorFactory
const Accessor =
  () => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  };

// parameter DecoratorFactory
export const Params =
  (name: string) =>
  (target: any, propertyKey: string, parameterIndex: number) => {
    let propDescriptor = Object.getOwnPropertyDescriptor(
      target[propertyKey],
      "meta:params",
    );
    if (!propDescriptor) { // not set yet
      // create a array has same length with the func (from target[propertyKey])
      let paramsArr = new Array(target[propertyKey].length);
      // set the array to propDescriptor
      propDescriptor = { value: paramsArr };
      // set propDescriptor to func
      Object.defineProperty(target[propertyKey], "meta:params", propDescriptor);
    }
    // add params name to the array in parameterIndex location
    propDescriptor.value[parameterIndex] = name;
  };
