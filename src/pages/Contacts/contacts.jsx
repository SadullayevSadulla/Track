import contactsData from "./contactData";
import "./contacts.css";
import { useLanguage } from "../../i18n/LanguageContext";

const Contacts = () => {
  const { t } = useLanguage();

  return (
    <div className="container">
      <div className="contact">
        <div className="contact_top">
          <div className="top_text">
            <h1>{t("contacts_title")}</h1>
          </div>
          <div className="top">
            <div className="top_right">
              <p>{t("contacts_address")}</p>
              <h3>
                {t("contacts_phone_nn")}
                <br />
                {t("contacts_phone_regions")}
                <br />
                {t("contacts_email_label")}
              </h3>
              <p>{t("contacts_service_booking")}</p>
            </div>
            <div className="top_left">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2985.498632807577!2d60.619624176763566!3d41.55845167127865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41dfc9c80878ac9b%3A0xf6030e79bea9e3b9!2sLimon%20IT%20kompaniyasi!5e0!3m2!1suz!2s!4v1788956175511!5m2!1suz!2s"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Google Maps"
              />
            </div>
          </div>
        </div>
        <div className="contact_bot">
          {contactsData.map((contact) => (
            <div
              key={contact.id}
              className="contact_item"
            >
              <div className="contact_avatar">
                <img
                  src={contact.image}
                  alt={contact.name}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <span>
                  {contact.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
              </div>
              <h3>{contact.name}</h3>
              <p>
                {t(contact.positionKey)}
              </p>
              <div className="phone_numbers">
                {contact.phone.map((number, index) => (
                  <p key={index}>
                    {number}
                  </p>
                ))}
                <p>
                  {contact.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;