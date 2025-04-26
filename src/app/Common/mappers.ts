import { IArtista } from "../interfaces/IArtista";

export function SpotifyArtistaParaArtista(
    spotifyArtista: SpotifyApi.ArtistObjectFull): IArtista {

    return {
        id: spotifyArtista.id,
        imagemUrl: spotifyArtista.images.sort((a, b) => a.width - b.width).pop().url,
        nome: spotifyArtista.name,
        musicas: []
    };
}