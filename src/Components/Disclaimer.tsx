function Disclaimer({eventName, eventLink} : {eventName :string, eventLink :string}) {
    return (
        <div style={{ marginTop: "25px", fontSize: "10px" }}>
            Todos os direitos reservados aos autores dos logótipos.
            <br />
            Não estou associado ao{" "}
            <a href={eventLink}>{eventName}</a> de maneira
            alguma.
            <br />
            Este bingo serve puramente para motivos recreativos.
            <br />
            Para contacto, posso ser encontrado em{" "}
            <a href="https://www.instagram.com/nebbycos/">@nebbycos</a> ou <a href="mailto:bernardo@nebulajoker.com">por e-mail</a>.
        </div>
    );
}

export default Disclaimer;
