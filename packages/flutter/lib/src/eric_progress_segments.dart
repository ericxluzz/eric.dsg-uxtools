import "package:flutter/material.dart";
import "../eric_tokens.dart";
import "eric_theme_ext.dart";

enum EricProgressState { on, ok, warn }

/// Progresso em etapas discretas — equivalente ao `ProgressSegments` web.
///
/// Faça: use para progresso em passos pequenos e conhecidos (ex. 4 documentos de uma OS).
/// Não faça: usar para percentuais livres — nesse caso use um `LinearProgressIndicator`.
class EricProgressSegments extends StatelessWidget {
  const EricProgressSegments({
    super.key,
    this.total = 4,
    this.done = 0,
    this.state = EricProgressState.on,
    this.semanticLabel,
  });

  final int total;
  final int done;
  final EricProgressState state;
  final String? semanticLabel;

  Color _corAtiva(EricColors c) {
    switch (state) {
      case EricProgressState.on:
        return c.primary;
      case EricProgressState.ok:
        return c.okSolid;
      case EricProgressState.warn:
        return c.stageVistoria;
    }
  }

  @override
  Widget build(BuildContext context) {
    final colors = context.ericColors;
    final ativa = _corAtiva(colors);
    return Semantics(
      label: semanticLabel,
      value: "$done de $total",
      child: Row(
        children: [
          for (var i = 0; i < total; i++) ...[
            if (i > 0) const SizedBox(width: 4),
            Expanded(
              child: Container(
                height: 5,
                decoration: BoxDecoration(
                  color: i < done ? ativa : colors.surface3,
                  borderRadius: BorderRadius.circular(99),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
