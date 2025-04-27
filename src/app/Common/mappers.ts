import { IArtista } from "../interfaces/IArtista";
import { IPlaylist } from "../interfaces/IPlaylist";
import { IUsuario } from "../interfaces/IUsuario";

export function SpotifyArtistaParaArtista(
    spotifyArtista: SpotifyApi.ArtistObjectFull): IArtista {

    return {
        id: spotifyArtista.id,
        imagemUrl: spotifyArtista.images.sort((a, b) => a.width - b.width).pop().url,
        nome: spotifyArtista.name,
        musicas: []
    };
}

export function SpotifyPlaylistParaPlaylist(
    playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
    return {
        id: playlist.id,
        nome: playlist.name,
        imagemUrl: playlist.images.pop().url
    };
}

export function SpotifyUsuarioParaUsuario(
    user: SpotifyApi.CurrentUsersProfileResponse): IUsuario {
    return {
        id: user.id,
        nome: user.display_name,
        imagemUrl: user.images.pop().url
    };
}