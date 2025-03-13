export default function ApplicationProcess() {
  const steps = [
    {
      number: "01",
      title: "Отправка резюме",
      description: "Заполните форму на сайте или отправьте резюме на hr@stroymarket.ru",
    },
    {
      number: "02",
      title: "Телефонное интервью",
      description: "HR-специалист свяжется с вами для первичного собеседования",
    },
    {
      number: "03",
      title: "Очное собеседование",
      description: "Встреча с руководителем отдела и выполнение тестового задания (при необходимости)",
    },
    {
      number: "04",
      title: "Предложение о работе",
      description: "Обсуждение условий сотрудничества и оформление документов",
    },
  ]

  return (
    <section className="container mx-auto px-4">
      <h2 className="mb-10 text-center text-3xl font-bold">Как проходит трудоустройство</h2>

      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-[15px] top-0 h-full w-0.5 bg-gray-200 md:left-1/2 md:-ml-0.5"></div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col md:flex-row md:items-center">
                {/* Circle with number */}
                <div className="absolute left-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-sm font-bold text-white md:left-1/2 md:-ml-4">
                  {index + 1}
                </div>

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:ml-auto"}`}
                >
                  <div className="rounded-lg bg-white p-6 shadow-md">
                    <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

