import "package:flutter/material.dart";
import "../eric_tokens.dart";
import "eric_theme_ext.dart";

/// Cabeçalho de app mobile, 56px (`EricMobile.eHeader`).
///
/// Faça: use [onBack] só quando a tela tiver uma anterior clara; alvo de toque ≥ 44 (já garantido aqui).
/// Não faça: colocar mais de uma ação em [action] — se precisar de mais, use um menu.
class EricHeader extends StatelessWidget implements PreferredSizeWidget {
  const EricHeader({super.key, required this.title, this.onBack, this.action});

  final String title;
  final VoidCallback? onBack;
  final Widget? action;

  @override
  Size get preferredSize => const Size.fromHeight(EricMobile.eHeader);

  @override
  Widget build(BuildContext context) {
    final colors = context.ericColors;
    return Container(
      height: EricMobile.eHeader,
      padding: const EdgeInsets.symmetric(horizontal: 8),
      decoration: BoxDecoration(
        color: colors.surface,
        border: Border(bottom: BorderSide(color: colors.border, width: 1)),
      ),
      child: Row(
        children: [
          if (onBack != null)
            SizedBox(
              width: EricMobile.eTouch,
              height: EricMobile.eTouch,
              child: IconButton(
                padding: EdgeInsets.zero,
                tooltip: "Voltar",
                icon: const Icon(Icons.arrow_back, size: 20),
                color: colors.text,
                onPressed: onBack,
              ),
            )
          else
            const SizedBox(width: 8),
          Expanded(
            child: Text(
              title,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: colors.text),
            ),
          ),
          if (action != null) action!,
        ],
      ),
    );
  }
}
