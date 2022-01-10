import axios, { AxiosRequestConfig } from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/cards";

export interface ICard {
  id?: string
  title: string,
  content?: string,
  list?: string
}

export const saveCard = async (card: ICard) => {
  return await axios.post(API_URL, {
    titulo: card.title,
    conteudo: card.content,
    lista: 'todo'
  },
    { headers: authHeader() } as AxiosRequestConfig);
};

export const getCards = async () => {
  return await axios.get(API_URL, { headers: authHeader() } as AxiosRequestConfig)
};

export const deleteCard = async (id: string, ) => {
  return await axios.delete(API_URL + `/${id}`, { headers: authHeader() } as AxiosRequestConfig);
};

export const editCard = async (card: ICard) => {
  return await axios.put(API_URL + `/${card.id}`, {
    id: card.id,
    titulo: card.title,
    conteudo: card.content,
    lista: card.list ? card.list : 'todo'
  },
    { headers: authHeader() } as AxiosRequestConfig);
};

