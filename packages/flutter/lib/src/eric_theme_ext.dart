import "package:flutter/material.dart";
import "../eric_tokens.dart";

/// Atalho para ler [EricColors] do tema atual. Requer que o app use [ericTheme].
extension EricColorsContext on BuildContext {
  EricColors get ericColors => Theme.of(this).extension<EricColors>() ?? EricColors.claro;
}
