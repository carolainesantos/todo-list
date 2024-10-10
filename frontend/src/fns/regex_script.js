export default function hasScript(text) {
  // Regex para detectar tags <script> e outras tags HTML maliciosas
  const htmlTagRegex =
    /<\/?(?:script|a|img|iframe|object|embed|form|input|link|meta)\s*.*?>/i;

  // Regex para detectar padrões comuns de SQL Injection
  const sqlInjectionRegex =
    /(\b(SELECT|INSERT|DELETE|UPDATE|DROP|UNION|ALTER|EXEC|DECLARE)\b)|(--|#|\bOR\b|\bAND\b)/i;

  if (htmlTagRegex.test(text) || sqlInjectionRegex.test(text)) {
    return true;
  }

  return false;
}
