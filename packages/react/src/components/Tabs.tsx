import * as RadixTabs from "@radix-ui/react-tabs";
import { Count } from "./Count";

export interface TabItem {
  value: string;
  label: string;
  count?: number;
  /** cor do ponto, ex. var(--c-stage-vistoria) */
  dot?: string;
}

export interface TabsProps {
  tabs: TabItem[];
  value?: string;
  onChange?: (v: string) => void;
  label?: string;
}

/**
 * Faça: abas que não cabem rolam na horizontal (a fonte nunca encolhe); navegue com as flechas (Radix cuida disso).
 * Não faça: usar para mais de ~8 seções sem agrupar — nesse caso prefira um menu.
 *
 * `Tabs` controla só a lista de abas; renderize o conteúdo de cada seção fora deste componente,
 * condicionado a `value`. Os painéis vazios abaixo existem só para o `aria-controls` do Radix apontar
 * para um elemento válido.
 */
export function Tabs({ tabs, value, onChange, label }: TabsProps) {
  return (
    <RadixTabs.Root value={value} onValueChange={onChange}>
      <RadixTabs.List className="e-tabs" aria-label={label}>
        {tabs.map((tab) => (
          <RadixTabs.Trigger key={tab.value} value={tab.value} className="e-tab">
            {tab.dot && <span className="e-tab__dot" style={{ background: tab.dot }} />}
            {tab.label}
            {tab.count != null && <Count n={tab.count} active={tab.value === value} />}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {tabs.map((tab) => (
        <RadixTabs.Content key={tab.value} value={tab.value} />
      ))}
    </RadixTabs.Root>
  );
}
