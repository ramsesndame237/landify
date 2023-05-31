export default {
  // Endpoints
  loginEndpoint: '/token',
  registerEndpoint: '/jwt/register',
  refreshEndpoint: '/auth/refresh/token',
  logoutEndpoint: '/logout',

  // This will be prefixed in authorization header with token
  // e.g. Role: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
