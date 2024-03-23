import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="w-screen min-h-screen p-10">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold mt-20 mb-9">Iniciar sesión</h1>
        <div className="w-full max-w-xs flex flex-col items-center">
          <div>
            <button className="rounded-md border-2 border-inherit h-9 w-full mt-2 px-3 text-sm font-medium">Continuar con Google</button>
            <button className="rounded-md border-2 border-inherit h-9 w-full mt-2 px-3 text-sm font-medium">Continuar con Hotmail</button>
            {/* <button className="rounded-md border-2 border-inherit h-9 w-full mt-2 px-3">Continuar con GitHub</button>
            <button className="rounded-md border-2 border-inherit h-9 w-full mt-2 px-3">Continuar con facebook</button> */}
          </div>

          <hr className="w-full my-6 bg-slate-950" />

          <div className="w-full">
            <form>
              <div className="mb-2">
                <label 
                  htmlFor="email" 
                  className="text-sm font-medium text-slate-500 mb-1.5">
                    Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                    focus:outline-none  focus:border-1 focus:ring-2 focus:ring-inset 
                    focus:ring-blue-300 sm:text-sm sm:leading-6"
                  placeholder="Escribe tu dirección de electrónico"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="password" 
                  className="text-sm font-medium text-slate-500 mb-1.5">
                    Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                    focus:outline-none  focus:border-1 focus:ring-2 focus:ring-inset 
                    focus:ring-blue-300 sm:text-sm sm:leading-6"
                  placeholder="Introduce la contraseña..."
                />
                <Link href="" className="text-sm font-medium text-blue-600 mt-1">
                  ¿No recuerdas tu contraseña?
                </Link>
              </div>

              <button 
                className="rounded-md border-2 border-blue-600 border-inherit h-9 w-full mt-2 px-3 bg-blue-600 text-white text-sm font-medium">
                Continuar con contraseña
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}