import "package:flutter/material.dart";
import "../eric_tokens.dart";
import "eric_theme_ext.dart";

enum EricStatusTone { ok, warn, info, bad, neu }

/// Selo por status (verde/laranja/azul/vermelho/cinza) — equivalente ao `StatusBadge` web.
///
/// Faça: sempre acompanhe a cor com texto (a cor nunca é o único sinal de status).
/// Não faça: inventar uma 6ª cor fora de ok/warn/info/bad/neu.
class EricStatusBadge extends StatelessWidget {
  const EricStatusBadge({super.key, required this.label, this.tone = EricStatusTone.neu, this.dot = false});

  final String label;
  final EricStatusTone tone;
  final bool dot;

  (Color bg, Color border, Color fg) _cores(EricColors c) {
    switch (tone) {
      case EricStatusTone.ok:
        return (c.okBg, c.okBd, c.okFg);
      case EricStatusTone.warn:
        return (c.warnBg, c.warnBd, c.warnFg);
      case EricStatusTone.info:
        return (c.infoBg, c.infoBd, c.infoFg);
      case EricStatusTone.bad:
        return (c.badBg, c.badBd, c.badFg);
      case EricStatusTone.neu:
        return (c.neuBg, c.neuBd, c.neuFg);
    }
  }

  @override
  Widget build(BuildContext context) {
    final (bg, border, fg) = _cores(context.ericColors);
    return Container(
      height: 22,
      padding: const EdgeInsets.symmetric(horizontal: 10),
      decoration: BoxDecoration(
        color: bg,
        border: Border.all(color: border),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (dot) ...[
            Container(width: 6, height: 6, decoration: BoxDecoration(color: fg, shape: BoxShape.circle)),
            const SizedBox(width: 6),
          ],
          Text(label, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: fg)),
        ],
      ),
    );
  }
}
