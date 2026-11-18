# eric_flutter

Tema e widgets ERIC para os apps Flutter do Conecta+.

## Status desta entrega

Este pacote foi escrito **sem acesso a um SDK Flutter/Dart neste ambiente** — não foi possível
rodar `flutter pub get`, `flutter analyze`, `flutter test` nem gerar os golden tests. Antes de usar
em produção, rode em uma máquina com Flutter instalado:

```bash
cd packages/flutter
flutter pub get
flutter analyze
flutter test --update-goldens   # primeira vez: gera as imagens de referência em test/golden/goldens/
flutter test                    # confere os golden tests e o teste de alvo de toque
```

## O que tem aqui

- `lib/eric_tokens.dart` — **gerado** por `packages/tokens/scripts/build-tokens.mjs` a partir de
  `referencia/tokens/*.css`. Não editar à mão; rode `pnpm --filter @eric/tokens build` na raiz do
  monorepo para regenerar (ele também grava uma cópia aqui).
- `lib/src/` — os 8 widgets da Fase 5 do `PLANO.md`: `EricHeader` (56px), `EricBottomNav`
  (`NavigationBar` 64px, indicador `soft`), `EricStickyAction`/`EricStickyActionButton` (54px, raio
  14), `EricBottomSheet` (raio 20, alça), `EricCard` (raio 16, borda, `elevation: 0`), `EricField`
  (52px, fonte 16), `EricStatusBadge`, `EricProgressSegments`.
- `test/golden/` — golden tests claro/escuro de cada widget (via `golden_toolkit`).
- `test/touch_target_test.dart` — confere alvo de toque ≥ 44×44 (`EricMobile.eTouch`).

## Uso

```dart
import "package:eric_flutter/eric_flutter.dart";

MaterialApp(
  theme: ericTheme(brightness: Brightness.light),
  darkTheme: ericTheme(brightness: Brightness.dark),
  home: Scaffold(
    appBar: EricHeader(title: "Solicitações"),
    bottomNavigationBar: EricBottomNav(
      value: "fila",
      items: const [
        EricNavItem(value: "fila", label: "Fila", icon: Icons.inbox_outlined),
      ],
      onChanged: (v) {},
    ),
  ),
);
```
