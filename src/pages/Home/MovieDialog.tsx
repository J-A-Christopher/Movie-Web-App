import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SpecificMovieData } from "@/utils/helper_interfaces";


interface MovieDialogProps {
  isMovieDialogOpen: boolean;
  onMovieDialogOpen: (value: boolean) => void;
  individualMData: SpecificMovieData;
}

export default function MovieDialog({
  isMovieDialogOpen,
  onMovieDialogOpen,
  individualMData,
}: MovieDialogProps) {
  return (
    <Dialog open={isMovieDialogOpen} onOpenChange={onMovieDialogOpen}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden mx-4 sm:mx-8 md:mx-12 my-6 sm:my-8">
        <div
          className="relative h-[300px] md:h-[500px] lg:h-[600px] w-full bg-cover bg-center rounded-lg"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9)), url(${encodeURI(
              `https://image.tmdb.org/t/p/w500/${individualMData.poster_path}`
            )})`,
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
            <DialogHeader className="space-y-2 sm:space-y-4">
              <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-white line-clamp-2">
                {individualMData.title}
              </DialogTitle>
              <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-white/80">
                <span>{individualMData.release_date}</span>
                <span>•</span>
                <div className="flex flex-wrap gap-2">
                  {individualMData.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded bg-white/20 px-2 py-0.5 text-xs sm:text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              <DialogDescription className="text-sm sm:text-base md:text-lg text-white">
                {individualMData.overview ===''? 'No overview available': individualMData.overview}   
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}