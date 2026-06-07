import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contacto | Rivera Escoto y Asociados SRL",
  description: "Contáctenos para solicitar una cotización de instalaciones eléctricas.",
};

export default function ContactoPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contáctanos</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            ¿Tienes un proyecto eléctrico? Escríbenos y te daremos respuesta a la brevedad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Información de contacto</h2>
              <ul className="space-y-5">
                {[
                  { icon: Phone, label: "Teléfono", value: "+505 0000-0000" },
                  { icon: Mail, label: "Email", value: "info@riveraescoto.com" },
                  { icon: MapPin, label: "Ubicación", value: "Nicaragua" },
                  { icon: Clock, label: "Horario", value: "Lun – Vie: 8:00am – 5:00pm" },
                ].map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-400/10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="text-amber-500" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{label}</p>
                      <p className="text-gray-800 font-semibold">{value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
