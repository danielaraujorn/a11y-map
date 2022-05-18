export const paths = {
  login: '/login',
  home: '/',
  places: '/places',
  newPlace: '/places/new',
  place: (id: string) => `/places/${id}`,
  signUp: '/sign-up',
  validators: '/validators',
  validator: (id: string) => `/validators/${id}`,
  newValidator: '/validators/new',
  forgotPassword: '/forgot-password',
  newPassword: '/new-password',
};
