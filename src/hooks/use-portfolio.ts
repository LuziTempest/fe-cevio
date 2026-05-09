import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { portfolioService } from "@/services/portfolio.service";

export const usePortfolio = () => {
  const queryClient = useQueryClient();

  const generateMutation = useMutation({
    mutationFn: portfolioService.generate,
  });

  const saveMutation = useMutation({
    mutationFn: portfolioService.save,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });

  const uploadPhotoMutation = useMutation({
    mutationFn: portfolioService.uploadPhoto,
  });

  const updatePortfolioPhotoMutation = useMutation({
    mutationFn: portfolioService.updatePortfolioPhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });

  const usePortfolios = () =>
    useQuery({
      queryKey: ["portfolios"],
      queryFn: portfolioService.getAll,
      select: (response) => response.data,
    });

  const usePortfolioByTitle = (title: string) =>
    useQuery({
      queryKey: ["portfolio", title],
      queryFn: () => portfolioService.getByTitle(title),
      enabled: !!title,
      select: (response) => response.data,
    });

  return {
    generate: generateMutation,
    save: saveMutation,
    uploadPhoto: uploadPhotoMutation,
    updatePortfolioPhoto: updatePortfolioPhotoMutation,
    usePortfolios,
    usePortfolioByTitle,
  };
};
