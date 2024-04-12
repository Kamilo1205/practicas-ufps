
interface Props {
    titulo: string;
    subtitulo: string;
    children: React.ReactNode;
}

export const FormularioGrid = ({ titulo, subtitulo, children }: Props) => {
  return (
    <>
        <div className="p-20">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-6">

				<div>
					<h2 className="font-semibold">
						{ titulo }
					</h2>
					<p className="text-gray-800 text-sm mt-1 leading-6">
						{ subtitulo }
					</p>
				</div>
                { children }
            </div>
        </div>
    </>
  );
}
