import "package:flutter/material.dart";
import "../eric_tokens.dart";
import "eric_theme_ext.dart";

/// Campo mobile, altura 52 (`EricMobile.eField`), fonte 16 (`EricMobile.eFsInput` — evita zoom no iOS).
///
/// Faça: `label` sempre visível acima; mostre `errorText` abaixo do campo com o motivo do erro.
/// Não faça: usar `hintText` no lugar de `label` — o rótulo precisa continuar visível ao digitar.
class EricField extends StatelessWidget {
  const EricField({
    super.key,
    required this.label,
    this.controller,
    this.hintText,
    this.errorText,
    this.required = false,
    this.obscureText = false,
    this.keyboardType,
    this.onChanged,
  });

  final String label;
  final TextEditingController? controller;
  final String? hintText;
  final String? errorText;
  final bool required;
  final bool obscureText;
  final TextInputType? keyboardType;
  final ValueChanged<String>? onChanged;

  @override
  Widget build(BuildContext context) {
    final colors = context.ericColors;
    final borderColor = errorText != null ? colors.badFg : colors.fieldBd;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        RichText(
          text: TextSpan(
            style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: colors.text),
            children: [
              TextSpan(text: label),
              if (required) TextSpan(text: " *", style: TextStyle(color: colors.badFg)),
            ],
          ),
        ),
        const SizedBox(height: 4),
        SizedBox(
          height: EricMobile.eField,
          child: TextField(
            controller: controller,
            obscureText: obscureText,
            keyboardType: keyboardType,
            onChanged: onChanged,
            style: TextStyle(fontSize: EricMobile.eFsInput, color: colors.text),
            decoration: InputDecoration(
              hintText: hintText,
              hintStyle: TextStyle(color: colors.text2),
              filled: true,
              fillColor: colors.surface,
              contentPadding: const EdgeInsets.symmetric(horizontal: 14),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(EricMobile.eRField),
                borderSide: BorderSide(color: borderColor),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(EricMobile.eRField),
                borderSide: BorderSide(color: borderColor),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(EricMobile.eRField),
                borderSide: BorderSide(color: colors.focus, width: 2),
              ),
            ),
          ),
        ),
        if (errorText != null) ...[
          const SizedBox(height: 4),
          Row(
            children: [
              Icon(Icons.error_outline, size: 13, color: colors.badFg),
              const SizedBox(width: 4),
              Expanded(
                child: Text(errorText!, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: colors.badFg)),
              ),
            ],
          ),
        ],
      ],
    );
  }
}
