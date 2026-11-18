import "dart:async";
import "package:golden_toolkit/golden_toolkit.dart";

/// Carrega as fontes reais (Poppins via google_fonts) antes dos golden tests,
/// senão o golden compara com a fonte de fallback do SO e fica instável entre máquinas.
Future<void> testExecutable(FutureOr<void> Function() testMain) async {
  await loadAppFonts();
  return testMain();
}
