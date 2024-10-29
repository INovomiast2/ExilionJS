export const ERROR_CODES = {
  // Build Errors (E01XX)
  BUILD_CONFIG_INVALID: 'E0101',
  BUILD_DEPENDENCY_MISSING: 'E0102',
  BUILD_COMPILATION_FAILED: 'E0103',

  // Runtime Errors (E02XX)
  RUNTIME_UNDEFINED_VARIABLE: 'E0201',
  RUNTIME_TYPE_ERROR: 'E0202',
  RUNTIME_ASYNC_ERROR: 'E0203',
  RUNTIME_PLUGIN_DUPLICATE: 'E0204',
  RUNTIME_PLUGIN_DEPENDENCY: 'E0205',
  RUNTIME_PLUGIN_HOOK_ERROR: 'E0206',

  // Router Errors (E03XX)
  ROUTER_PAGE_NOT_FOUND: 'E0301',
  ROUTER_INVALID_ROUTE: 'E0302',
  ROUTER_MIDDLEWARE_ERROR: 'E0303',

  // Component Errors (E04XX)
  COMPONENT_RENDER_ERROR: 'E0401',
  COMPONENT_PROP_TYPE_ERROR: 'E0402',
  COMPONENT_LIFECYCLE_ERROR: 'E0403',

  // API Errors (E05XX)
  API_REQUEST_FAILED: 'E0501',
  API_RESPONSE_INVALID: 'E0502',
  API_TIMEOUT: 'E0503',
} as const;