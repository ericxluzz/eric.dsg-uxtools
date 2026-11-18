import "package:flutter/material.dart";
import "../eric_tokens.dart";
import "eric_theme_ext.dart";

/// Faixa fixa no rodapé com a ação principal da tela (ex. "Concluir OS").
///
/// Faça: no máximo um [EricStickyActionButton] + uma ação secundária opcional.
/// Não faça: usar para ações que não sejam a conclusão/confirmação principal da tela.
class EricStickyAction extends StatelessWidget {
  const EricStickyAction({super.key, required this.child, this.secondary});

  final Widget child;
  final Widget? secondary;

  @override
  Widget build(BuildContext context) {
    final colors = context.ericColors;
    return SafeArea(
      top: false,
      child: Container(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
        decoration: BoxDecoration(
          color: colors.surface,
          border: Border(top: BorderSide(color: colors.border, width: 1)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            child,
            if (secondary != null) ...[const SizedBox(height: 8), secondary!],
          ],
        ),
      ),
    );
  }
}

/// Botão primário de 54px (`EricMobile.eButton`) com raio 14 (`EricMobile.eRField`), largura total.
class EricStickyActionButton extends StatelessWidget {
  const EricStickyActionButton({super.key, required this.label, this.onPressed, this.loading = false});

  final String label;
  final VoidCallback? onPressed;
  final bool loading;

  @override
  Widget build(BuildContext context) {
    final colors = context.ericColors;
    return SizedBox(
      width: double.infinity,
      height: EricMobile.eButton,
      child: ElevatedButton(
        onPressed: loading ? null : onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: colors.primary,
          foregroundColor: colors.onPrimary,
          disabledBackgroundColor: colors.disabled,
          disabledForegroundColor: colors.disabledFg,
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(EricMobile.eRField)),
        ),
        child: loading
            ? SizedBox(
                width: 18,
                height: 18,
                child: CircularProgressIndicator(strokeWidth: 2, color: colors.onPrimary),
              )
            : Text(label, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
      ),
    );
  }
}
