// @ts-expect-error flag global reconhecida pelo React para act() em testes
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "vitest";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);
afterEach(() => cleanup());
