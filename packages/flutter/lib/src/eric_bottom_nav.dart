import "package:flutter/material.dart";
import "../eric_tokens.dart";
import "eric_theme_ext.dart";

class EricNavItem {
  const EricNavItem({required this.value, required this.label, required this.icon});

  final String value;
  final String label;
  final IconData icon;
}

/// Barra de navegação inferior, 64px (`EricMobile.eBottomnav`), indicador `soft` (sem Material padrão).
///
/// Faça: use para 3–5 destinos principais do app, sempre visíveis.
/// Não faça: usar para mais de 5 itens — nesse caso prefira um Drawer/menu.
class EricBottomNav extends StatelessWidget {
  const EricBottomNav({super.key, required this.items, required this.value, this.onChanged});

  final List<EricNavItem> items;
  final String value;
  final ValueChanged<String>? onChanged;

  @override
  Widget build(BuildContext context) {
    final colors = context.ericColors;
    final selectedIndex = items.indexWhere((i) => i.value == value).clamp(0, items.length - 1);

    return SafeArea(
      top: false,
      child: SizedBox(
        height: EricMobile.eBottomnav,
        child: NavigationBarTheme(
          data: NavigationBarThemeData(
            backgroundColor: colors.surface,
            indicatorColor: colors.soft,
            labelTextStyle: WidgetStateProperty.resolveWith(
              (states) => TextStyle(
                fontSize: 11,
                fontWeight: states.contains(WidgetState.selected) ? FontWeight.w600 : FontWeight.w500,
                color: states.contains(WidgetState.selected) ? colors.strong : colors.text2,
              ),
            ),
            iconTheme: WidgetStateProperty.resolveWith(
              (states) => IconThemeData(
                color: states.contains(WidgetState.selected) ? colors.strong : colors.text2,
                size: 20,
              ),
            ),
          ),
          child: NavigationBar(
            height: EricMobile.eBottomnav,
            backgroundColor: colors.surface,
            surfaceTintColor: Colors.transparent,
            selectedIndex: selectedIndex,
            onDestinationSelected: (i) => onChanged?.call(items[i].value),
            destinations: [
              for (final item in items)
                NavigationDestination(icon: Icon(item.icon), label: item.label),
            ],
          ),
        ),
      ),
    );
  }
}
