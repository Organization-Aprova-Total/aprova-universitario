"use client";

import { useState, type FormEvent } from "react";
import { Rich } from "../_lib/rich";
import { conteudo, CAMPANHA, FORM_CAMPOS_OCULTOS, FORM_CAMPOS_UTM, FORM_ENDPOINT } from "../_content";

type Erros = { nome?: string; email?: string; whatsapp?: string; envio?: string };
type Estado = "inicial" | "enviando" | "enviado";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    _show_thank_you?: (id: string, message: string, trackcmpUrl?: string, email?: string) => void;
    _show_error?: (id: string, message: string, html?: string) => void;
    _load_script?: (url: string) => void;
  }
}

/**
 * Formulário "Planos de Ensino" (única ilha cliente da página).
 *
 * Reproduz o embed do ActiveCampaign (form 281) sem o script dele: o embed
 * envia por JSONP (GET em proc.php?...&jsonp=true) e o servidor responde
 * com um JS que chama `_show_thank_you(id, mensagem)` ou `_show_error`.
 * Aqui essas duas funções são registradas em `window` antes de injetar o
 * script, e a mensagem de agradecimento que o ActiveCampaign devolve é
 * exibida no lugar do formulário. Telefone vai como "+55 11999999999",
 * igual ao embed. UTMs da URL vão em field[176]/[190]/[175].
 * FORM_ENDPOINT vazio = modo preview (valida, dispara o evento e avança).
 * Dispara `generate_lead` no dataLayer antes do envio.
 */
/** Bandeira do Brasil (o embed mostra a bandeira do país antes do DDI). */
function BandeiraBr() {
  return (
    <svg viewBox="0 0 20 14" aria-hidden="true">
      <rect width="20" height="14" fill="#009c3b" />
      <path d="M10 1.5 18.5 7 10 12.5 1.5 7z" fill="#ffdf00" />
      <circle cx="10" cy="7" r="3.2" fill="#002776" />
      <path d="M7.2 6.2c2-.6 4.1-.3 5.7.9" stroke="#fff" strokeWidth=".6" fill="none" />
    </svg>
  );
}

export function PlanosEnsino() {
  const c = conteudo.planos;
  const f = c.form;
  const [estado, setEstado] = useState<Estado>("inicial");
  const [erros, setErros] = useState<Erros>({});
  const [obrigado, setObrigado] = useState<string>("");

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);
    const nome = String(dados.get("fullname") ?? "").trim();
    const email = String(dados.get("email") ?? "").trim();
    const tel = String(dados.get("phone") ?? "").replace(/\D/g, "");
    const novos: Erros = {};
    if (nome.split(/\s+/).filter(Boolean).length < 2) novos.nome = f.erroNome;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) novos.email = f.erroEmail;
    if (tel.length < 10 || tel.length > 11) novos.whatsapp = f.erroWhatsapp;
    setErros(novos);
    if (Object.keys(novos).length) return;

    const params = new URLSearchParams(window.location.search);
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(FORM_CAMPOS_OCULTOS)) q.set(k, v);
    q.set("fullname", nome);
    q.set("email", email);
    q.set("phone", `+55 ${tel}`);
    for (const [utm, campo] of Object.entries(FORM_CAMPOS_UTM)) q.set(campo, params.get(utm) ?? "");
    q.set("jsonp", "true");

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: "generate_lead", campanha: CAMPANHA, formulario: "planos-de-ensino" });

    if (!FORM_ENDPOINT) {
      setEstado("enviado");
      return;
    }

    setEstado("enviando");
    const concluir = (msg: string) => {
      setObrigado(msg);
      setEstado("enviado");
    };
    const falhar = (msg?: string) => {
      setErros({ envio: msg || f.erroEnvio });
      setEstado("inicial");
    };
    window._show_thank_you = (_id, message) => concluir(message);
    window._show_error = (_id, message) => falhar(message);
    window._load_script = (url) => {
      const s = document.createElement("script");
      s.src = url;
      document.head.appendChild(s);
    };
    const script = document.createElement("script");
    script.src = `${FORM_ENDPOINT}?${q.toString()}`;
    script.onerror = () => falhar();
    document.head.appendChild(script);
  }

  return (
    <section id="planos-de-ensino" className="au-sec au-planos">
      <div className="au-duas">
        <div className="au-duas__texto">
          <h2>{c.h2}</h2>
          <p className="au-duas__p au-duas__p--leve">{c.p1}</p>
          <p className="au-duas__p au-duas__p--leve"><Rich text={c.p2} /></p>
        </div>
        <div className="au-duas__img">
          <div className="au-form">
            {estado === "enviado" ? (
              <div className="au-form__ok" role="status" dangerouslySetInnerHTML={{ __html: obrigado || f.obrigado }} />
            ) : (
              <form onSubmit={enviar} noValidate>
                <span className="au-form__titulo">{f.titulo}</span>
                <label className="au-form__campo">
                  <span className="au-form__rotulo">{f.nome} <b aria-hidden="true">{f.obrigatorio}</b></span>
                  <input type="text" name="fullname" placeholder={f.nomePlaceholder} autoComplete="name" required aria-invalid={!!erros.nome} />
                  {erros.nome && <span className="au-form__erro" role="alert">{erros.nome}</span>}
                </label>
                <label className="au-form__campo">
                  <span className="au-form__rotulo">{f.email} <b aria-hidden="true">{f.obrigatorio}</b></span>
                  <input type="email" name="email" placeholder={f.emailPlaceholder} autoComplete="email" required aria-invalid={!!erros.email} />
                  {erros.email && <span className="au-form__erro" role="alert">{erros.email}</span>}
                </label>
                <label className="au-form__campo">
                  <span className="au-form__rotulo">{f.whatsapp} <b aria-hidden="true">{f.obrigatorio}</b></span>
                  <span className="au-form__tel">
                    <BandeiraBr />
                    <span className="au-form__ddi" aria-hidden="true">{f.ddi}</span>
                    <input type="tel" name="phone" placeholder={f.whatsappPlaceholder} autoComplete="tel-national" inputMode="tel" required aria-invalid={!!erros.whatsapp} />
                  </span>
                  {erros.whatsapp && <span className="au-form__erro" role="alert">{erros.whatsapp}</span>}
                </label>
                {erros.envio && <span className="au-form__erro" role="alert">{erros.envio}</span>}
                <button type="submit" className="au-form__enviar" disabled={estado === "enviando"}>
                  {estado === "enviando" ? f.enviando : f.enviar}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
