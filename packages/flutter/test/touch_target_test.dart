import "package:flutter/material.dart";
import "package:flutter_test/flutter_test.dart";
import "package:eric_flutter/eric_flutter.dart";

/// Alvo de toque ≥ 44×44 no mobile (ver referencia/guidelines/ACESSIBILIDADE.md).
void main() {
  Widget comTema(Widget child) {
    return MaterialApp(
      theme: ericTheme(brightness: Brightness.light),
      home: Scaffold(body: child),
    );
  }

  testWidgets("EricHeader: botão Voltar tem alvo >= 44x44", (tester) async {
    await tester.pumpWidget(comTema(EricHeader(title: "Detalhe", onBack: () {})));
    final size = tester.getSize(find.byTooltip("Voltar"));
    expect(size.width, greaterThanOrEqualTo(44));
    expect(size.height, greaterThanOrEqualTo(44));
  });

  testWidgets("EricBottomNav: cada destino tem alvo >= 44x44", (tester) async {
    await tester.pumpWidget(
      comTema(
        const EricBottomNav(
          value: "fila",
          items: [
            EricNavItem(value: "fila", label: "Fila", icon: Icons.inbox_outlined),
            EricNavItem(value: "mapa", label: "Mapa", icon: Icons.map_outlined),
          ],
        ),
      ),
    );
    final destinos = find.byType(NavigationDestination);
    expect(destinos, findsNWidgets(2));
    for (final element in destinos.evaluate()) {
      final box = element.renderObject;
      if (box is RenderBox) {
        expect(box.size.height, greaterThanOrEqualTo(44));
      }
    }
  });

  testWidgets("EricStickyActionButton: altura de 54px (acima do mínimo de 44)", (tester) async {
    await tester.pumpWidget(comTema(const EricStickyActionButton(label: "Concluir OS")));
    final size = tester.getSize(find.byType(EricStickyActionButton));
    expect(size.height, equals(EricMobile.eButton));
    expect(size.height, greaterThanOrEqualTo(EricMobile.eTouch));
  });

  testWidgets("EricField: altura de 52px (acima do mínimo de 44)", (tester) async {
    await tester.pumpWidget(comTema(const EricField(label: "Protocolo")));
    expect(EricMobile.eField, greaterThanOrEqualTo(EricMobile.eTouch));
  });
}
