import "package:flutter/material.dart";
import "../eric_tokens.dart";
import "eric_theme_ext.dart";

/// Card mobile, raio 16 (`EricMobile.eRCard`), borda 1px, `elevation: 0` (profundidade só por borda/fundo).
///
/// Faça: combine com `colors.surface` sobre `colors.page` para a troca de fundo fazer a profundidade.
/// Não faça: adicionar `boxShadow` — regra inegociável do ERIC (ver CLAUDE.md).
class EricCard extends StatelessWidget {
  const EricCard({super.key, required this.child, this.padding = const EdgeInsets.all(14), this.onTap});

  final Widget child;
  final EdgeInsets padding;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final colors = context.ericColors;
    final card = Container(
      padding: padding,
      decoration: BoxDecoration(
        color: colors.surface,
        border: Border.all(color: colors.border, width: 1),
        borderRadius: BorderRadius.circular(EricMobile.eRCard),
      ),
      child: child,
    );
    if (onTap == null) return card;
    return Material(
      color: Colors.transparent,
      borderRadius: BorderRadius.circular(EricMobile.eRCard),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(EricMobile.eRCard),
        child: card,
      ),
    );
  }
}
