import type { FilterQuery } from "./index.js";

interface VeryComplexData {
  id: number;
  name: string;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
    nestedInfo: {
      prop1: string;
      prop2: number;
      nestedArray: {
        propX: boolean;
        propY: string;
      }[];
    };
  };
  arrayData: {
    array1: string[];
    array2: {
      subArray1: number[];
      subArray2: {
        propA: string;
        propB: boolean;
        nestedObjects: {
          subProp1: number;
          subProp2: {
            subSubPropA: string;
            subSubPropB: boolean;
          }[];
        }[];
      }[];
    }[];
  };
  otherProperties: {
    isActive: boolean;
    count: number;
    settings: {
      option1: boolean;
      option2: string;
      option3: {
        nestedOption: string;
        deepNestedOption: {
          propC: number;
          propD: {
            subPropC: boolean;
            subPropD: string[];
          };
        };
      };
    };
    relatedItems: {
      itemID: string;
      itemName: string;
    }[];
  };
}

type ActualResult = FilterQuery<VeryComplexData>;

declare const f: ActualResult;
console.log(f);
