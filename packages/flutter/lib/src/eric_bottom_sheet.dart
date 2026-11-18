import "package:flutter/material.dart";
import "../eric_tokens.dart";
import "eric_theme_ext.dart";

/// Gaveta que sobe de baixo, raio 20 (`EricMobile.eRSheet`) no topo + alça.
///
/// Faça: use `showEricBottomSheet` (foco preso e Esc/voltar já vêm do Flutter); título em `<h2>` semântico.
/// Não faça: usar para formulários longos — prefira uma tela cheia nesse caso.
Future<T?> showEricBottomSheet<T>({
  required BuildContext context,
  required String title,
  required WidgetBuilder builder,
}) {
  final colors = context.ericColors;
  return showModalBottomSheet<T>(
    context: context,
    isScrollControlled: true,
    backgroundColor: colors.surface,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.only(
        topLeft: Radius.circular(EricMobile.eRSheet),
        topRight: Radius.circular(EricMobile.eRSheet),
      ),
    ),
    builder: (context) => EricBottomSheetContent(title: title, child: Builder(builder: builder)),
  );
}

class EricBottomSheetContent extends StatelessWidget {
  const EricBottomSheetContent({super.key, required this.title, required this.child});

  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final colors = context.ericColors;
    return SafeArea(
      top: false,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 40,
                height: 4,
                margin: const EdgeInsets.only(bottom: 12),
                decoration: BoxDecoration(color: colors.border2, borderRadius: BorderRadius.circular(99)),
              ),
            ),
            Text(
              title,
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: colors.text),
            ),
            const SizedBox(height: 12),
            Flexible(child: child),
          ],
        ),
      ),
    );
  }
}
