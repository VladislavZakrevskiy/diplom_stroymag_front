import { Shield, Clock, GraduationCap, Heart, Users, TrendingUp } from "lucide-react"

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Shield,
      title: "Стабильность",
      description: "Официальное трудоустройство по ТК РФ, белая заработная плата, оплачиваемые отпуска и больничные",
    },
    {
      icon: Clock,
      title: "Удобный график",
      description: "5/2 с 9:00 до 18:00, возможность гибкого графика для некоторых позиций",
    },
    {
      icon: GraduationCap,
      title: "Обучение и развитие",
      description: "Корпоративное обучение, тренинги, семинары, возможность посещения профессиональных выставок",
    },
    {
      icon: Heart,
      title: "Забота о сотрудниках",
      description: "ДМС после испытательного срока, корпоративные мероприятия, подарки к праздникам",
    },
    {
      icon: Users,
      title: "Дружный коллектив",
      description: "Команда профессионалов, готовых поддержать и помочь в решении рабочих задач",
    },
    {
      icon: TrendingUp,
      title: "Карьерный рост",
      description: "Возможность профессионального и карьерного развития внутри компании",
    },
  ]

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center text-3xl font-bold">Почему стоит работать с нами</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow-md transition-transform hover:scale-105">
              <div className="mb-4 inline-flex rounded-full bg-gray-100 p-3">
                <benefit.icon className="h-6 w-6 text-gray-800" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

