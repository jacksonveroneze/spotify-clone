import { AuthConfig } from "angular-oauth2-oidc";

export const environment = {
    production: false
};

export const spotifyAuthConfig: AuthConfig = {
    loginUrl: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
    clientId: '0da67ee923854ec9b4aa6fcf06f1cd6b',
    redirectUri: 'http://127.0.0.1:4200/login/',
    responseType: 'code',
    // 👇 Flags que evitam OIDC
    requireHttps: true,
    skipIssuerCheck: true,
    disableAtHashCheck: true,
    requestAccessToken: true,
    oidc: false, // <---------------------- ESSENCIAL
    silentRefreshRedirectUri: '',
    scope: [
        'user-read-private',
        'user-read-email',
        "user-read-currently-playing", // musica tocando agora.
        "user-read-recently-played", // ler musicas tocadas recentemente
        "user-read-playback-state", // ler estado do player do usuario
        "user-top-read", // top artistas e musicas do usuario
        "user-modify-playback-state", // alterar do player do usuario.
        "user-library-read", // ler biblioteca dos usuarios
        "playlist-read-private", // ler playlists privads
        "playlist-read-collaborative" // ler playlists colaborativas
    ].join(' ')
};