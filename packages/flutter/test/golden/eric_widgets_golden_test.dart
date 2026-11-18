import "package:flutter/material.dart";
import "package:flutter_test/flutter_test.dart";
import "package:golden_toolkit/golden_toolkit.dart";
import "package:eric_flutter/eric_flutter.dart";

/// Golden tests claro/escuro dos widgets ERIC.
///
/// Rodar pela primeira vez (ou após mudança visual intencional) com:
///   flutter test --update-goldens test/golden/eric_widgets_golden_test.dart
/// Depois disso, `flutter test` compara contra os PNGs salvos em test/golden/goldens/.
Widget _comTema(Widget child, Brightness brightness) {
  return MaterialApp(
    theme: ericTheme(brightness: brightness),
    home: Scaffold(body: Center(child: Padding(padding: const EdgeInsets.all(16), child: child))),
  );
}

void main() {
  for (final brightness in [Brightness.light, Brightness.dark]) {
    final tema = brightness == Brightness.light ? "claro" : "escuro";

    testGoldens("EricHeader · tema $tema", (tester) async {
      await tester.pumpWidgetBuilder(
        _comTema(const EricHeader(title: "Solicitação AMA-2026-000041"), brightness),
        surfaceSize: const Size(390, 120),
      );
      await screenMatchesGolden(tester, "eric_header_$tema");
    });

    testGoldens("EricBottomNav · tema $tema", (tester) async {
      await tester.pumpWidgetBuilder(
        _comTema(
          const EricBottomNav(
            value: "fila",
            items: [
              EricNavItem(value: "fila", label: "Fila", icon: Icons.inbox_outlined),
              EricNavItem(value: "mapa", label: "Mapa", icon: Icons.map_outlined),
              EricNavItem(value: "perfil", label: "Perfil", icon: Icons.person_outline),
            ],
          ),
          brightness,
        ),
        surfaceSize: const Size(390, 90),
      );
      await screenMatchesGolden(tester, "eric_bottom_nav_$tema");
    });

    testGoldens("EricStickyAction · tema $tema", (tester) async {
      await tester.pumpWidgetBuilder(
        _comTema(
          const EricStickyAction(child: EricStickyActionButton(label: "Concluir OS")),
          brightness,
        ),
        surfaceSize: const Size(390, 110),
      );
      await screenMatchesGolden(tester, "eric_sticky_action_$tema");
    });

    testGoldens("EricCard · tema $tema", (tester) async {
      await tester.pumpWidgetBuilder(
        _comTema(
          EricCard(
            child: Text("AMA-2026-000041 · Buraco na via", style: TextStyle(fontWeight: FontWeight.w600)),
          ),
          brightness,
        ),
        surfaceSize: const Size(360, 100),
      );
      await screenMatchesGolden(tester, "eric_card_$tema");
    });

    testGoldens("EricField · tema $tema (com erro)", (tester) async {
      await tester.pumpWidgetBuilder(
        _comTema(
          const EricField(label: "E-mail", required: true, errorText: "Informe um e-mail válido."),
          brightness,
        ),
        surfaceSize: const Size(360, 110),
      );
      await screenMatchesGolden(tester, "eric_field_erro_$tema");
    });

    testGoldens("EricStatusBadge · tema $tema", (tester) async {
      await tester.pumpWidgetBuilder(
        _comTema(
          const Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              EricStatusBadge(label: "Concluído", tone: EricStatusTone.ok, dot: true),
              SizedBox(width: 8),
              EricStatusBadge(label: "Atrasada", tone: EricStatusTone.bad, dot: true),
            ],
          ),
          brightness,
        ),
        surfaceSize: const Size(300, 60),
      );
      await screenMatchesGolden(tester, "eric_status_badge_$tema");
    });

    testGoldens("EricProgressSegments · tema $tema", (tester) async {
      await tester.pumpWidgetBuilder(
        _comTema(
          const SizedBox(
            width: 220,
            child: EricProgressSegments(total: 4, done: 2, semanticLabel: "Documentos enviados"),
          ),
          brightness,
        ),
        surfaceSize: const Size(260, 60),
      );
      await screenMatchesGolden(tester, "eric_progress_segments_$tema");
    });
  }
}
